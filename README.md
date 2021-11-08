# Grafik WP Engine CLI Interface

- [Grafik WP Engine CLI Interface](#grafik-wp-engine-cli-interface)
  - [How to use](#how-to-use)
    - [Authentication](#authentication)
    - [Sites](#sites)
    - [Installs](#installs)
    - [Accounts](#accounts)

## How to use

### Authentication

1. make sure API is enabled on your WP Engine account
2. grab the API username and Password
3. ```grafik auth``` will bring up a prompt to add credentials
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
