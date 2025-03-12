## Install the node modules

Run `npm i` to fetch and install all the used node packages.

## Run the application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Architectural decisions

I have structured this project in way so that we can continue to build upon it module by module. If we need common components, services, tools etc., we can place (and later find) it in the common folder.
E.g. the api-service and the models used can be found in this folder.

Then there is the service called covid-data.service which helps me maintain everything in one place. The whole logic is there.

The other structure is the same as any other application, with a small change that this problem did not require of me to create a module because of its size.