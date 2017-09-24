# geotrellis-demo
The client-side application of the Geotrellis Demo.

### Getting started

#### Quick setup

Clone the project, `cd` into the directory, then run `./scripts/setup.sh` to create the Vagrant VM and then build the Docker container(s).

`setup.sh` can also be used to restore the project to its initial state: it will re-provision the VM, then remove and rebuild the Docker container(s).

Note: this will destroy the VM's existing Docker container(s) before rebuilding it.

#### Using Docker in the VM

The other project scripts are meant to execute in the VM in the `/vagrant` directory. To run the container(s) during development use the following commands:

    vagrant up
    vagrant ssh
    cd /vagrant
    ./scripts/server.sh

### Ports

| Port | Service |
| --- | --- |
| [9090](http://localhost:9090) | Webpack dev server |
| [7357](http://localhost:7357) | Test 'em server |

### Testing

To run the tests and linter during development:

- Run the test script with `./scripts/test.sh`

To run unit tests interactively during development:

- Run the container with `./scripts/server.sh`
- Run the Test'em server with `./scripts/test.sh --testem` and point your browser to [localhost:7357](http://localhost:7357).
- Update the test bundle with `./scripts/bundletests.sh`

### Scripts

| Name | Description |
| --- | --- |
| `bundletests.sh` | Updates the test bundle |
| `cibuild.sh` | Build the project for CI server |
| `cipublish.sh` | Zips assets for deployment |
| `clean.sh` | Clean up unused Docker resources to free disk space |
| `console.sh` | Run `docker-compose exec app /bin/sh` |
| `deploy.sh` | Deploy assets created by cibuild.sh to an S3 bucket |
| `infra.sh` | Execute Terraform subcommands with remote state management |
| `lint.sh` | Run ESLint on JavaScript code |
| `server.sh` | Run `docker-compose up` and start a server on port 9090 |
| `setup.sh` | Bring up the VM, and then destroy and rebuild Docker container(s) |
| `test.sh` | Run unit tests and the linting script |
| `testem.sh` | Run the testem server |
| `update.sh` | Rebuild the App container with required `yarn` dependencies |

### Docker

This project uses a Docker container inside the Vagrant box, so here are a few Docker commands you can use to get oriented to what's happening in the VM. You'll need to `vagrant ssh` into the vm, then `cd /vagrant` to use them:

- `docker images` will show you a list of all your VM's installed images
- `docker rmi <IMAGE>` will delete the specified image
- `docker-compose up` will build and start container according to the instructions in `docker-compose.yml` file
- `docker-compose ps` will show you a list of running containers
- `docker-compose down` will halt these running containers
- `docker-compose build` will rebuild the containers listed in the `docker-compose.yml` file
- `docker-compose exec <SERVICE> /bin/sh` where `<SERVICE>` is a service name specified in `docker-compose.yml` will open a shell to a currently running container
- `docker rm $(docker ps -a -q)` will destroy all Docker containers on the VM
- `docker rmi $(docker images -q)` will destroy all Docker images on the VM

Here are the
[docker](https://docs.docker.com/engine/reference/commandline/) and  [docker-compose](https://docs.docker.com/compose/reference/overview/)
 command line reference guides.

### Adding `yarn` Packages

To add new yarn packages to the React application:

- Manually add the package's name and version number to `package.json` to ensure it will be built in the Docker container.
- `vagrant ssh` into the virtual machine, then `./scripts/update.sh` to update the app container and install the new package.
