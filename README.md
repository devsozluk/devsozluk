<div align="center">
  <a href="https://www.devsozluk.net">
    <img
      src="https://github.com/devsozluk/website/blob/main/src/assets/images/logo.png?raw=true"
      alt="DevSozluk Logo"
      height="64"
    />
  </a>
  <br />
  <br/>

[![Website](https://img.shields.io/website?url=https://www.devsozluk.net)](https://www.devsozluk.net/)
![GitHub stars](https://img.shields.io/github/stars/devsozluk/website?logo=github)
![GitHub forks](https://img.shields.io/github/forks/devsozluk/website?logo=github)
[![GitHub commits](https://badgen.net/github/commits/Naereen/Strapdown.js)](https://GitHub.com/devsozluk/commit)
![GitHub contributors](https://img.shields.io/github/contributors/devsozluk/website?logo=github)
<hr/>
</div>

## **About**

**DevSözlük**, The project I have created is a platform that aims to facilitate communication, knowledge sharing, and question and answer opportunities among software developers. In this project, I have built a structure that allows other software developers to contribute as well. This platform enables software developers to share their ideas, answer questions, and help each other.

## **Folder Structure**

```sh
├── devsozluk/
    └── src/ # Source files
        ├── assets/ # Static files
        ├── components/ # React components
        │   ├── Elements/ # Basic components
        │   ├── Form/ # Form components
        │   ├── Layout/ # Layout components
        │   └── Loading/ # Loading components
        ├── libs/ # Libraries
        ├── pages/ # Pages
        │   ├── auth/ # Authentication pages
        │   │   ├── Login # Login page
        │   │   ├── Register # Register page
        │   │   ├── Redirect # Redirect page
        │   │   └── EmailVerification # Email verification page
        │   ├── errors/ # Error pages
        │   │   └── NotFound # Not found page
        │   ├── Home # Home page
        │   ├── Profile # Profile page
        │   └── Topic # Topic page
        ├── router/ # React router
        ├── store/ # Redux store
        ├── types/ # Typescript types
        └── utils/ # Utilities
```

## **Tech Stack**

 - [`Vite`](https://vitejs.dev/)
 - [`React`](https://reactjs.org/)
 - [`React-Router`](https://reactrouter.com/en/main)
 - [`React-Redux`](https://react-redux.js.org/)
 - [`TypeScript`](https://www.typescriptlang.org/)
 - [`TailwindCSS`](https://tailwindcss.com/)
 - [`Altogic`](https://www.altogic.com/)


## **Tasks**

- [x] Added role-based authentication.
- [x] Mail Verification system will be added.
- [ ] User profile pages will be added.
- [ ] Badge system will be added for users.