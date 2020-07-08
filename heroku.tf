provider "heroku" {
  version = "~> 2.0"
}

provider "github" {
  individual = "true"
  anonymous = "true"
}

data "github_release" "release" {
    repository  = "holdermind-frontend"
    owner       = "mombachm"
    retrieve_by = "latest"
}

resource "heroku_app" "holdermind-frontend" {
  name   = "holdermind-frontend"
  region = "us"
}

resource "heroku_build" "holdermind-frontend" {
  app = heroku_app.holdermind-frontend.id

  buildpacks = ["https://github.com/mars/create-react-app-buildpack.git"]

  source = {
    url = data.github_release.release.tarball_url
    version = data.github_release.release.name
  }
}

