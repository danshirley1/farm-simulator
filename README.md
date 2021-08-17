# farm-simulator
An interview test, just how many emissions is your farm producing?

This project uses [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html).

Please develop against the right Node environment, there is an `.nvmrc` file. (See [here](https://medium.com/@faith__ngetich/locking-down-a-project-to-a-specific-node-version-using-nvmrc-and-or-engines-e5fd19144245) for more info.)

## Front end client

### Boilerplate

The front end client was scaffolded using [vue-cli](https://cli.vuejs.org/) at verion 4.5.13 on 10/8/2021.

### Getting started

Install the dependencies (please use [yarn](https://yarnpkg.com/lang/en/docs/install) over npm). Run:

```
yarn
```

Then to kick things off, run:

```
yarn serve
```

### Compile and minify for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

Or take full control as per normal, e.g.

```
jest --watch --verbose --runInBand --testPathPattern=tests/unit -t 'my test name pattern'
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


## Back end server

The Express server was scaffolded using [express generator](https://expressjs.com/en/starter/generator.html) at verion 4.16.1 on 10/8/2021.

### Getting started

Change into the `/server` directory.

Then install the dependencies (please use [yarn](https://yarnpkg.com/lang/en/docs/install) over npm). Run:

```
yarn
```

Then to kick things off, run:

```
yarn start
```

# Implementation Overview

This task was somewhat over-specified for a 2 hour job, therefore I versioned incremental commits every 2 hours or so and you can gauge my progress from that.

Unfortunately without any starter app 2 hours was sent on getting to any type of starting point to avoid not really demonstrating much.

However it's not a problem, it's an enjoyable test so I did the hours :)

Take a look at the commit history in the repository and you'll see the following major milestones marked as Git Tags:

- **initial-setup** (1.5 hours). I had an existing Vue/ Express boilerplate lying around that I could have just copied, but the dependencies were a little old plus I wanted to demonstrate how I could scaffold things from scratch - so I went ahead and did just that. Everything is freshly built using vue-cli and contains an Express application, Jest, ESLint, Babel, Vuex, BootstrapVue.

- **static-end-to-end-example** (2 hours). This is most of the front end work and includes the use of router, Vuex state, fairly robust form logic (validation and things).

- **calculations-preparation** (1.5 hours). This brings all of the required reference data in to the runtime in the form of a couple of OO classes which can then be used to start running some  business logic to generate the required calculations. I've skipped the file upload requirement and just put the CSV output of the supplied Excel documents in the `/source-data` directory. There is a CSV parsing routine which generates flat array structures for building up some more formal business objects in the aforementioned classes. This tag sees the introduction of a couple of example unit tests.  

- **calculations-actual**. (2 hours).

**NOTE**

It is not clear how the fields:

 - 'Tractors Diesel'
 - 'Usage (l / 100mile)'
 - 'Milk machines'
 - 'Usage (kWh) per machine'

fit in to the equation based on the specification.

It is therefore decided that this is either:

- A red herring
- Should be used to somehow calculate some type of average emission per 'mile' or kwH of electricity usage but I'm not sure there is sufficient information to do that
- Forms part of some other practical test/ an extension of this test, yet to be further specified

Therefore I am going to calculate the 3 simple emission scopes for each of the 11 farms based on just their purchase history.

Update - I have taken this as far as I can for now, enough for us to discuss. Things that I would do next are:

- Pre-populate the drop down options from a GET request to the server to get options for purchases, not a problem
- Add the actual purchases field options in the form - hard coded in the server code for now as have demonstrated form techniques
- Form validation server side
- Get to the bottom of the required calculations
- All of which is simply a matter of time

Speak later, kind regards - Dan Shirley
