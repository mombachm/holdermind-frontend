provider "heroku" {
  version = "~> 2.0"
}

resource "heroku_app" "holdermind-frontend" {
  name   = "holdermind-frontend"
  region = "us"
}

resource "heroku_build" "holdermind-frontend" {
  app = heroku_app.holdermind-frontend.id

  buildpacks = ["https://github.com/mars/create-react-app-buildpack.git"]

  source = {
    url = "https://github.com/mombachm/holdermind-frontend/archive/master.tar.gz"
    version = "1.0"
  }
}

