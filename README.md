# HSA SoC Remote Server
[Deployed on heroku](https://hsa-soc.herokuapp.com/).

This script creates an HTTP server that registers messages.

# Install

Create a GitHub free account.

Fork this repository on GitHub.

Create a [Heroku](https://www.heroku.com/) free account.

Create a new Heroku app.

Go to Resources and search for the Heroku Postgres Addon. Select the free tier.

Go to Settings and Reveal Config Vars. Create a new config var named SECRET and use a random UUID as the value. You may use [this random UUID generator](https://www.uuidgenerator.net/version4).

Go to Deploy and select GitHub as Deployment Method. Follow the instructions for authorization.

Select the forked repository from the list and use the Deploy Branch button.

The HTTP server should be working.