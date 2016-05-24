package config

import play.api.Environment
import play.api.Configuration
import javax.inject._

import models.User

case object Done

@Singleton
class Config @Inject()(implicit env: Environment) {
  val configuration = Configuration.load(env)

  object CannotGetLocalisation extends Exception

  object API {
    object CannotGetAPIUrl extends Exception
    object CannotGetAPIPort extends Exception

    val url = configuration.getString("api.url").getOrElse({
      throw CannotGetAPIUrl
    })

    val port = configuration.getInt("api.port").getOrElse({
      throw CannotGetAPIPort
    })

  }
  val localisation = configuration.getString("localisation").flatMap(User.stringToLocal)
    .getOrElse({
      throw CannotGetLocalisation
    })
}
