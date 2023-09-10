# Social Network 18

![GitHub Liscense](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This project aims to establish a robust backend using Mongoose for a social media platform. Our primary goal is to harness the capabilities of Mongoose while also broadening our understanding of complementary technologies. We aspire to create a welcoming space where users can freely express their thoughts, engage in meaningful discussions, and share reactions with like-minded individuals. This platform is envisioned as a hub for lively and thought-provoking conversations, fostering a sense of community among its users

## Video Link


https://github.com/Marinah1031/SocialNetwork18/assets/125934804/463e3c1c-d5c8-4f75-81bf-a42975990abf


## Table of Contents

- [Social Network 18](#social-network-18)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Questions](#questions)

## Installation

- Install Mongo DB and Mongoose
- Install Insomnia or some other application to view the API routes
- Run *npm install*
- Run *npm start*


## Usage

-For both '/users' and '/thoughts', we have 'GET' and 'POST' requests that operate on the root of these models, allowing users to retrieve and create data.

To interact with individual entities, such as a specific user or thought, we have 'GET', 'PUT', and 'DELETE' requests that include an ID in the route, like '/users/:userId' and '/thoughts/:thoughtId'. This structure enables actions like viewing, updating, and deleting specific user profiles or thoughts.

To facilitate connections between users, we've implemented the concept of 'friends lists'. Users can manage their friends list to follow content by sending requests to '/api/users/:userId/friends/:friendId'. This allows users to establish relationships and follow updates from specific friends.

Similar to the friends feature, we've also incorporated a system for thoughts and their reactions. Users can interact with thoughts and reactions by utilizing routes like '/api/thoughts/:thoughtId/reactions'. This setup enables users to express their thoughts and reactions to posts within the platform.

## License

[MIT License](https://choosealicense.com/licenses/mit/)

## Questions

For further questions regarding the repository, create an issue or contact me at: marinahtam@gmail.com. You can find more of my work on GitHub here: Marinah1031 (https://github.com/Marinah1031 /).
