## Deployment Setup

```
1) firebase init hosting
2) firebase hosting:sites:create [site-id] -> [site-id].web.app or [site-id].firebaseapp.com
3) firebase target:apply hosting [target-name] [site-id]
4) Add target option in your firebase.json file
5) firebase emulators:start --only hosting:[target-name]
6) firebase deploy --only hosting:[target-name]

# Helpful Commands
PROJECT_ID=microfrontends-design-patterns

firebase open --project $PROJECT_ID
firebase projects:list
firebase hosting:sites:list --project $PROJECT_ID
firebase hosting:sites:delete [site-id]

```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
