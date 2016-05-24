package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.ws._
import scala.concurrent.{ExecutionContext, Future, Promise}
import scala.concurrent.duration._

import config.{Config, Done}
import models.User

@Singleton
class MessagerieController @Inject()(implicit config: Config, exec: ExecutionContext, ws: WSClient) extends Controller {

  def index = Action { request =>
    Ok(views.html.index())
  }

  def auth = Action { request =>
    Ok
  }

  def register = Action { request =>
    Ok(views.html.register())
  }

  def client = Action { request =>
    Ok(views.html.client())
  }

  def registerPost = Action.async(parse.multipartFormData) { request =>
    val form = request.body
    (for {
      email <- form.dataParts.get("email").flatMap(_.headOption)
      username <- form.dataParts.get("username").flatMap(_.headOption)
      password <- form.dataParts.get("password").flatMap(_.headOption)
    } yield {
      User.insertNewUser(
        username = username,
        email = email,
        password = password,
        localisation = config.localisation
      ).map(eith => eith match {
        case Left(e) => InternalServerError(Json.toJson(e))
        case Right(done) => Redirect(routes.MessagerieController.client)
      })
    }).getOrElse(Future.successful(BadRequest))
  }
}
