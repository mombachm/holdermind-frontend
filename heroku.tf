provider "heroku" {
  version = "~> 2.0"
}

resource "heroku_app" "holdermind-frontend" {
  name   = "holdermind-frontend"
  region = "us"
}

data "github_release" "latest-release" {
    repository  = "example-repository"
    owner       = "example-owner"
    retrieve_by = "latest"
}

resource "heroku_build" "holdermind-frontend" {
  app = heroku_app.holdermind-frontend.id

  buildpacks = ["https://github.com/mars/create-react-app-buildpack.git"]

  source = {
    url = "https://github.com/mombachm/holdermind/archive/1.0.tar.gz"
    version = "1.0"
  }
}

