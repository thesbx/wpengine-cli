# Grafik WP Engine CLI Interface | Early Access

This tool is still in development, feel free to fork and extend for your own needs. I plan on adding complete functionality to interface with the WP Engine API. Once that is complete I will extend the functionality.

- [Grafik WP Engine CLI Interface | Early Access](#grafik-wp-engine-cli-interface--early-access)
  - [How to use](#how-to-use)
    - [Setup](#setup)
    - [Authentication](#authentication)
    - [Sites](#sites)
    - [Installs](#installs)
    - [Accounts](#accounts)
    - [Roadmap](#roadmap)

## How to use

### Setup

For debugging you can rename `.env.sample` to `.env` and update the variables. The tool will automatically overwrite the file with you run the `auth` command.

1. clone this repo
2. `cd wpengine-cli`
3. `npm install -g`

### Authentication

1. make sure API is enabled on your WP Engine account
2. grab the API username and Password
3. ```gk auth``` will bring up a prompt to add credentials
4. enter the credentials from step 2.

### Sites

The ```sites``` command provides an interface for various WP Engine site tasks

1. add sites
2. list sites
3. list site by ID
4. update sites
5. delete sites

### Installs

The ```installs``` command allows you to manage the WordPress installs in your accounts.
You can view installs for specific sites or a verbose list.

### Accounts

You can list the accounts you are associated with by using the ```accounts``` command.

### Roadmap

- [ ] add bulk edit options. This could include options for updating WordPress users using wordpress cli.
- [ ] finish API integration.
