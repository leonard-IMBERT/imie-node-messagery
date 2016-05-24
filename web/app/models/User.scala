package models

import java.util.UUID
import play.api.data.validation.ValidationError
import play.api.libs.json._
import play.api.libs.ws._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import scala.math.BigDecimal

import config.Config
import config.Done

case class User(
  id: UUID,
  email: String,
  username: String,
  password: String,
  localisation: User.Localisation
)

object User {

  implicit object localisationFormat extends Format[Localisation] {
    override def reads(json: JsValue): JsResult[Localisation] = json.validate[String].flatMap(x => stringToLocal(x) match {
      case Some(local) => JsSuccess(local)
      case None => JsError(Seq(JsPath() -> Seq(ValidationError("Not a valid localisation", x))))
    })

    override def writes(lo: Localisation): JsValue = JsString(localToString(lo))
  }

  implicit val userFormat = Json.format[User]

  implicit object errorWrite extends Writes[Error] {
    override def writes(er: Error): JsValue = er match {
      case UserIdNotFound => JsObject(Map("error" -> JsString("There is no user with this user_id")))
      case NoUserIdProvided => JsObject(Map("error" -> JsString("There is an error with the request done to the api")))
      case ParsingError => JsObject(Map("error" -> JsString("The response of the api is unparsable")))
      case UnknownError(response) => JsObject(Map(
        "error" -> JsString("An unknow error happen"),
        "response" -> JsObject(Map(
          "code" -> JsNumber(BigDecimal(response.status)),
          "body" -> JsString(response.body)
        ))
      ))
    }
  }

  sealed trait Error
  case object UserIdNotFound extends Error
  case object NoUserIdProvided extends Error
  case object ParsingError extends Error
  case class UnknownError(response: WSResponse) extends Error

  sealed trait Localisation
  case object Nantes extends Localisation
  case object Lyon extends Localisation

  def localToString(lo: Localisation): String = lo match {
    case Nantes => "Nantes"
    case Lyon => "Lyon"
  }

  def stringToLocal(lo: String): Option[Localisation] = lo match {
    case "Nantes" => Some(Nantes)
    case "Lyon" => Some(Lyon)
    case _ => None
  }

  def genNewUser(email: String, username: String, password: String, localisation: Localisation): User = {
    User(UUID.randomUUID, email, username, password, localisation)
  }

  def insertNewUser(
    username: String,
    localisation: Localisation,
    password: String,
    email: String
  )(implicit c: Config, ws: WSClient, ec: ExecutionContext): Future[Either[Error, Done.type]] = {
    ws.url("http://" + c.API.url + ":" + c.API.port.toString + "/user").post(JsObject(Map(
      "username" -> JsString(username),
      "localisation" -> JsString(localToString(localisation)),
      "password" -> JsString(password),
      "mail" -> JsString(email)
    ))).map(response => response.status match {
      case 200 => Right(Done)
      case _ => Left(UnknownError(response))
    })
  }

  def updateUser(user: User)(implicit c: Config, ws: WSClient, ec: ExecutionContext): Future[Either[Error, Done.type]] = {
    ws.url("http://" + c.API.url + ":" + c.API.port.toString + "/user")
      .withQueryString("user_id" -> user.id.toString)
      .put(JsObject(Map(
        "username" -> JsString(user.username),
        "localisation" -> JsString(localToString(user.localisation)),
        "mail" -> JsString(user.email)
      ))).map(response => response.status match {
        case 200 => Right(Done)
        case 404 => Left(UserIdNotFound)
        case 400 => Left(NoUserIdProvided)
        case _ => Left(UnknownError(response))
      })
  }

  def getUser(id: UUID)(implicit c: Config, ws: WSClient, ec: ExecutionContext): Future[Either[Error, User]] = {
    ws.url("http://" + c.API.url + ":" + c.API.port.toString + "/user")
      .withQueryString("user_id" -> id.toString)
      .get.map(response => response.status match {
        case 200 => response.json.asOpt[User].toRight(ParsingError)
        case 404 => Left(UserIdNotFound)
        case 400 => Left(NoUserIdProvided)
        case _ => Left(UnknownError(response))
      })
  }

  def deleteUser(id: UUID)(implicit c: Config, ws: WSClient, ec: ExecutionContext): Future[Either[Error, Done.type]] = {
    ws.url("http://" + c.API.url + ":" + c.API.port.toString + "/user")
      .withQueryString("user_id" -> id.toString)
      .delete.map(response => response.status match {
        case 200 => Right(Done)
        case 404 => Left(UserIdNotFound)
        case 400 => Left(NoUserIdProvided)
        case _ => Left(UnknownError(response))
      })
  }
}
