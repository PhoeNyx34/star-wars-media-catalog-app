<h1>🌌✨ <b>Holocron</b></h1>
<p>a Star Wars  media catalog and tracker</p>

<p>The application uses React/Express to render a web app that allows users to view existing Star Wars media, including movies, TV shows, books, comics, and video games. Users may search and filter by various parameters (e.g., canon or legend, media type, primary characters, time period,  target audience age). When signed in, users may rate media and also mark whether media is owned, want to watch, watched, etc.</p>

# Installation
<p>After cloning the repository, run the code below whil in the root directory to install dependencies and create the database.</p>

```Node
$ yarn install
$ createdb star-wars-media-catalog-app_development
```

<p>Create a directory for the app in your desired location, cd into the new directory, and run the following code.</p>

```Node
$ cd server
$ yarn run migrate:latest
$ yarn run db:seed
$ cd ..
$ yarn run dev
```

<p>You can now navigate to http://localhost:3000/ to see and interact with the app. The current version seeds the first 6 films to the database.</p>

<img alt="Screenshot of Holocron app home page" src="https://github.com/PhoeNyx34/star-wars-media-catalog-app/assets/145715326/63caf28b-bc82-4d29-90d2-6d2fe39bdd54">

# Usage
<p>The app seeds with 2 default users:</p>
<ul>
    <li>Email: starwarsnerd@test.com, Password: 123, Type: admin</li>
    <li>Email: glup.shitto@test.com, Password: 123, Type: member</li>
</ul>
<p>When logged in as member, you can browse the site, use search and filter, mark media as want, own, and/or watched, and view lists of marked media on their account page.</p>
<p>When logged in as admin, you can do everything a member can plus add, edit, and delete media in the database. An 'Add new media' button is available on the account page; edit and delete can be performed from any media tile or show page.</p>

# TODO
<ul>
    <li>Add filter functionality alongside search</li>
    <li>Create admin-only edit media functionality</li>
    <li>Add API, feature, unit testing</li>
    <li>Improve site responsiveness</li>
    <li>Create data visualization of media timeline</li>
</ul>

# Contributing
This app is owned and managed by PhoeNyx34.

If you're interested in contributing, please reach out to the owner via LinkedIn.
