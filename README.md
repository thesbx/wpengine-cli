# wpengine CLI | Early Access

This tool is still in development, feel free to fork and extend for your own needs. I plan on adding complete functionality to interface with the wpengine API. Once that is complete I will extend the functionality.

- [wpengine CLI | Early Access](#wpengine-cli--early-access)
  - [How to use](#how-to-use)
    - [Installation](#installation)
    - [Authentication](#authentication)
    - [Sites](#sites)
    - [Installs](#installs)
    - [Accounts](#accounts)
    - [Roadmap](#roadmap)
    - [Notes](#notes)

## How to use

### Installation

For debugging you can rename `.env.sample` to `.env` and update the variables. The tool will automatically overwrite the file with you run the `auth` command.

1. Clone this repository
2. `cd wpengine-cli`
3. `npm install` -- installs dependencies
4. `npm install -g` -- allows use of `wpe` command globally

### Authentication

1. make sure API is enabled on your WP Engine account
2. grab the API username and Password
3. ```wpe auth``` will bring up a prompt to add credentials
4. you will need to have an ssh key added in order to use some features
   - you can optionally set the ssh path
   - `wpe users list` will not run without a valid key

### Sites

The ```sites``` command provides an interface for various WP Engine site tasks

1. add sites
2. list sites
3. list site by ID
4. update sites
5. delete sites
6. list wp users

### Installs

The ```installs``` command allows you to manage the WordPress installs in your accounts.
You can view installs for specific sites or a verbose list.

### Accounts

You can list the accounts you are associated with by using the ```accounts``` command.

### Roadmap

- [ ] add bulk edit options. This could include options for updating WordPress users using wordpress cli.
- [ ] finish API integration.

### Notes

- The users CLI will write a .csv file to your OS home directory
