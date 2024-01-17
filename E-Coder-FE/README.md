[![License: YP](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![GitHub release (latest by date)](https://img.shields.io/github/v/release/MilanCommunity/Milan)](https://github.com/MilanCommunity/Milan/releases) ![GitHub repo size](https://img.shields.io/github/repo-size/MilanCommunity/Milan)

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB or MongoDB Atlas account
- Clerk.com
  
### Installation

1. Clone the repository

```bash
https://github.com/PhanHongYenQuynh/E-Coder.git
```
2. Go to the project directory and install dependencies for both the client and server

```bash
cd e-coder
npm start
```

# How to develop new feature?
- Step 1: You need cho checkout new branch follow this format: **features/<your-name>/<feature-name>**
  ```
  git checkout develop
  git checkout -b feature/quynh/login
  ```
- Step 2: Commit your code with message 
  ```
  git add *
  git commit -m "Describe your commit"
  git push origin feature/quynh/login
  ```
- Step 3: Enter this url in your browser: *https://github.com/PhanHongYenQuynh/E-Coder*
- Step 4: Create "Pull request": https://www.atlassian.com/git/tutorials/making-a-pull-request -> DONE
  ![image](https://github.com/khaphan-github/china-chess-nodejs-be/assets/76431966/00cde7b6-c54a-4f3d-9ec3-b9a7ee158dd6)
# How to get new feature from develop?
- Step 1: Commit your code if you change some thing:
  ```
  git add *
  git commit -m "Describe your commit"
  ```
- Step 2: Merge code from **develop** branch:
  ```
  git merge develop
  ```
- Step 3: Handle conflict (optional):

  ![image](https://github.com/khaphan-github/china-chess-nodejs-be/assets/76431966/49116151-4f05-4cec-bcb5-c4f35db2e7a3)

