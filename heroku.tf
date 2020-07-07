provider "heroku" {
  version = "~> 2.0"
}

resource "heroku_app" "holdermind-frontend" {
  name   = "holdermind-frontend"
  region = "us"
}