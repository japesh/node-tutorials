Node Tutorials
===


The purpose of this prject is to teach about Node.

## NodeJS

- [Node.js](https://nodejs.org/en/about/) is a JavaScript runtime environment. 
- It is asynchronous event driven. 
- Node is designed to build scalable network applications. 

## Why nodeJS?

Before node each incoming request or connection the server treat it as a new thread of execution or as a new process to handle the request and send a response. This makes perfect sense, but in practice it incurs a great deal of overhead.

Node.js takes a different approach. It runs a single-threaded event loop registered with the system to handle connections, and each new connection causes a JavaScript callback function to fire. 

The callback function can handle requests with non-blocking I/O calls, and if necessary can spawn threads from a pool to execute blocking or CPU-intensive operations and to load-balance across CPU cores. 

Which helps it to save a lot of memory without compromising the scalability.

## What is the [Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)?

The event loop allows Node.js to perform non-blocking I/O operations by transfering operations to the system kernel whenever possible.

Since most kernels are mutithreded, they can handle multiple operations executing in the background. 

When one of these operations completes, the kernel tells Node.js so that the appropriate callback can be added to the poll queue to eventually be executed. 

## NPM
NPM is the official Node Package Manager (it’s not the only one), where “all” your Node packages live on the internet.

npm consists of three distinct components:

- the website
- the Command Line Interface (CLI)
- the registry

Use the website to discover packages, set up profiles, and manage other aspects of your npm experience. For example, you can set up Orgs (organizations) to manage access to public or private packages.

The CLI runs from a terminal, and is how most developers interact with npm.

The registry is a large public database of JavaScript software and the meta-information surrounding it.

~~~~
npm install --save <pkg>
~~~~

## How to start?

~~~~
npm init
~~~~

![alt text](https://raw.githubusercontent.com/japesh/Overlapped-image-Event-handling-/master/output.png?_sm_au_=iVVLH21Vn15SRQs5)

check active port
~~~~
netstat -a
~~~~

## Points to be covered
* Creating server with http.
## old doc


Now read the local database section to finish the setup.

Once you have set up the database and the bucket is green and has content, run `docker-compose up` to bring up the other services.
If something is still broken at this point, try restarting `docker-compose`.

**Note: It can take some time for the Couchbase server to become available, check its status [here](http://localhost:8091/ui/index.html#/buckets) before panicking.**

### Installing AWS CLI Tools

#### Install Pip (Windows Only)
Ensure the following (or equivalent) is in your PATH: `c:\Python27:c:\Python27\Scripts`
Install Pip: `curl https://bootstrap.pypa.io/get-pip.py | python`

#### Install AWS CLI tools with pip
Install AWS CLI tools: `pip install awscli`

## Docker Compose Options

The Docker Compose flavours that are available:

- **img**: `docker-compose up ./docker-compose.img.yml` will use CI images, and requires you to be logged into ECR to clone them.
- **img + caching**: `docker-compose up -f ./docker-compose.img.caching.yml` will use CI images with a local Varnish cache. Requires you to be logged into ECR to clone them.
- **src**: `docker-compose up -f ./docker-compose.src.yml` will compile all source locally. This may be necessary if you have added a dependency that isn't in the CI image. Once you've pushed your code and there is a CI image you should be able to switch back.
- **src + caching**: `docker-compose up -f ./docker-compose.src.caching.yml` will compile all source locally with a local Varnish cache. This may be necessary if you have added a dependency that isn't in the CI image. Once you've pushed your code and there is a CI image you should be able to switch back.
- **base**: the base yml is not runnable, it provides a base set of services to be extended, this is to avoid duplicate configurations that may lead to confusion.

*If you need a combination of any of the above, you can define a custom docker-compose.yml file and extend their services. This will be .gitignore'd*

## Local Database

Due to a lack of direct network accesss to the development couchbase server,
a local couchbase server is required for development. Here are the steps:

1. Head over to [CouchBase](http://localhost:8091) and go through the setup process (see setting up).
2. Run `./scripts/sync-db`

sync-db will connect directly to the Dublin EK Couchbase instance and restore a backup to your local couchbase server.

### Setting up

- The Administrator password should be configured to `couch@1234` in order for scripts to work.
- The Couchbase server should be given `512MB` of RAM, it won't actually use this, but it's a good default.

Any other options are up to you.

## Scripts

All scripts will need to be made executable with `chmod +x ./scripts/*`.

- **install-credentials**: Installs the SSH configuration and keys required to log into the CI services defined below. It also installs AWS credentials needed to authenticate with ECR, without this you will be unable to download CI docker images.
- **sync-db**: Syncronises your local Couchbase container with the CI Couchbase.
- **login-ecr**: Logs into ECR (Requires install-credentials to have been run)
- **connect-proxy**: Starts a SOCKS proxy on port 3030 to allow access to the Dublin VPC. See "Accessing dev CI" for further information.
- **clone-all**: Clones service repositories
- **setup**: Meta script that runs `install-credentials`, `clone-all`, and `login-ecr` in preparation for an initial project setup.
- **git**: Runs any given git command in whole list of repos. Example: `./scripts/git status` will show the status for every repo.

## Accessing Dev CI

The dev CI is only available under special networking conditions, you must:

- Be connected to the EK VPN
- Run `./scripts/connect-proxy`
- Install [ProxySwitchy](https://chrome.google.com/webstore/detail/dpplabbmogkhghncfbfdeeokoefdjegm) and configure a SOCKS5 proxy at localhost:3030.

Once connected, within Chrome, you will be able to resolve servers hosted within the Dublin VPC.

Some of these are:

- [Rancher](http://10.107.0.199:8080)
- [Jenkins](http://10.108.7.132:8080/build/)
- [Couchbase](http://10.107.0.190:8091/ui/index.html)
- [Frontend Demo](http://10.107.0.74:3000)

App Services:

- [Composition Engine](http://10.107.0.84:51465/global/english/index)
- [Content Service](http://10.107.0.84:51466)
- [Data Resolution Service](http://10.107.0.84:51467)
- [Utility Service](http://10.107.0.84:51464)
- [Template Service](http://10.107.0.84:51463)

## Test Paths

To test the Content service is functioning properly, test if `/page/ekgroup/global/english/index` returns JSON content.
To test the Composition Engine, test if `/global/english/index` returns a page
To test the Template Service, test if `/` returns the component list

[why-nodejs]: https://www.infoworld.com/article/3210589/node-js/what-is-nodejs-javascript-runtime-explained.html
