package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.ws._
import scala.concurrent.{ExecutionContext, Future, Promise}
import scala.concurrent.duration._
import scala.util.Try
import java.util.UUID

import config.{Config, Done}
import models.User

@Singleton
class MessagerieController @Inject()(implicit config: Config, exec: ExecutionContext, ws: WSClient) extends Controller {

  def index = Action { request =>
    Ok(views.html.index())
  }

  def auth = Action.async(parse.multipartFormData) { request =>
    val form = request.body
    (for {
      email <- form.dataParts.get("email").flatMap(_.headOption)
      password <- form.dataParts.get("password").flatMap(_.headOption)
    } yield {
      User.getUserByEmail(
        email = email,
        password = password
      ).map(eith => eith match {
        case Right(Some(user)) => Redirect(routes.MessagerieController.client).withSession("user_id" -> user.id.toString)
        case Right(None) => Redirect(routes.MessagerieController.index)
        case Left(e) => InternalServerError(Json.toJson(e))
      })
    }).getOrElse(Future.successful(Redirect(routes.MessagerieController.index)))
  }

  def register = Action { request =>
    Ok(views.html.register())
  }

  def client = Action { request =>
    (for {
      id <- request.session.get("user_id").flatMap(x => Try(UUID.fromString(x)).toOption)
    } yield {
      Ok(views.html.client(config.API.url, config.API.port, id))
    }).getOrElse(BadRequest)
  }

  def registerPost = Action.async(parse.multipartFormData) { request =>
    val form = request.body
    (for {
      email <- form.dataParts.get("email").flatMap(_.headOption)
      username <- form.dataParts.get("username").flatMap(_.headOption)
      password <- form.dataParts.get("password1").flatMap(_.headOption)
    } yield {
      User.insertNewUser(
        username = username,
        email = email,
        password = password,
        localisation = config.localisation
      ).map(eith => eith match {
        case Left(e) => InternalServerError(Json.toJson(e))
        case Right(done) => Redirect(routes.MessagerieController.index)
      })
    }).getOrElse(Future.successful(BadRequest))
  }
}
