# Gmail Autoresponder

This Node.js application utilizes the Gmail API to automatically respond to emails while you are on vacation. It helps you set up an automatic vacation responder to let people know that you are away and provide them with a customized message.

## Prerequisites

Before running the application, make sure you have the following prerequisites:

- Node.js (version 12 or above)
- A Google Cloud Platform (GCP) project with the Gmail API enabled
- OAuth 2.0 credentials (client ID and client secret) for your GCP project

## Installation

1. Clone this repository: git clone https://github.com/aj12-houdini/Automated-Email-using-Gmail-API.git
2. Navigate to the project directory
3. Install the dependencies: npm install
4. Set up the OAuth 2.0 credentials:
   1. Go to the Google Cloud Console and create a new project.
   2. Enable the Gmail API for your project.
   3. Create OAuth 2.0 credentials (client ID and client secret) and download the JSON file.
   4. Rename the JSON file to credentials.json and place it in the root directory of the project.
5. Run the application: node app.js

## Contributions
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request.
