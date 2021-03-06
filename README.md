#### Master

![](https://travis-ci.org/CenterForOpenScience/experimenter.svg?branch=master)

#### Develop

![](https://travis-ci.org/CenterForOpenScience/experimenter.svg?branch=develop)

# Experimenter

> A platform to create and administer experiments.

Documentation available [here](http://experimenter.readthedocs.org/en/latest/)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/docs/install) (a package manager like npm)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Prepare JamDB instance
Experimenter is designed to talk to a [JamDB](https://github.com/CenterForOpenScience/jamdb) server for all 
data storage. In most cases you will be provided a remote staging server for development purposes, but for advanced 
development, [these setup scripts](https://github.com/samchrisinger/jam-setup) can help define a basic skeleton for 
your project.

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `yarn install --pure-lockfile`
* `bower install`

To use the video capture facilities of Experimenter, you will also need to place the file `VideoRecorder.swf` 
in your `<project_name>/public/` folder. **This file is not part of the git repository**; it is from the HDFVR flash video 
recorder and must be obtained from a team member with access to the licensed version. They can also provide the
necessary configuration to talk to a valid and licensed streaming media server (eg Wowza); see below.

### Install submodule dependencies

```bash
cd lib
git submodule init
git submodule update
```

#### Addons development

The exp-player and exp-models addons live in the lib directory. This is Ember's conventional place
for putting in-repo-addons (see package.json also). If you need to develop on either of the exp-*
addons, simply do your work in the submodule directory (lib/exp-<name>) and when you're ready commit
and push the changes like usual.


## Running / Development

To login via OSF:
* create .env file in top directory
* in .env file include:
```bash
OSF_CLIENT_ID="\<client ID for staging account\>"
OSF_SCOPE="osf.users.profile_read"
OSF_URL="https://staging-accounts.osf.io"
SENTRY_DSN=""
WOWZA_PHP='{}'
WOWZA_ASP='{}'
```

First:
* make sure jamdb is running, see: https://github.com/CenterForOpenScience/jamdb
* then: `yarn run bootstrap`

This:
- Makes the _experimenter_ namespace in jamdb.
- Creates an _admins_ collection under the _experimenter_ namespace.
- Configures jamdb to use the schemas from `schemas/*.json` to validate records in the corresponding collections.
- Sets up permissions as defined in `dev/permissions.py`
- Populates the appropriate collections with the sample data in `dev/data`. See `dev/data/admins.json` for example logins; use:
```
namespace=experimenter
collection=admins
username=<id>
password=password
```

Then:
* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Adding dependencies on other packages
Sometimes, you will want to install an additional third-party package. In place of npm, this project uses `yarn`. 
Most of the [commands](https://yarnpkg.com/en/docs/managing-dependencies) are the same, but this alternative tool 
provides a way for two developers to guarantee they are using the same versions of underlying code. (by running 
`yarn install --pure-lockfile`) This can help avoid a situation where things break unexpectedly when run on a different 
computer.

Whenever you choose to update your dependencies (`yarn add x` or `yarn install`), make sure that code still runs, then
be sure to [commit](https://yarnpkg.com/en/docs/yarn-lock) the modified `yarn.lock` file, which represents the "current 
known working state" for your app. 

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

### COS is Hiring!

Want to help save science? Want to get paid to develop free, open source software? [Check out our openings!](http://cos.io/jobs) 
