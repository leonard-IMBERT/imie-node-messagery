package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import scala.concurrent.{ExecutionContext, Future, Promise}
import scala.concurrent.duration._

@Singleton
class MessagerieController @Inject()(implicit exec: ExecutionContext) extends Controller {

  def index = Action { request =>
    Ok(views.html.index())
  }

  def auth = Action { request =>
    Ok
  }

  def register = Action { request =>
    Ok(views.html.register())
  }

  def registerPost = Action { request =>
    Ok
  }
}
