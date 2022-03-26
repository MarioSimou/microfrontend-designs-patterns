## Deployment Setup

```
firebase hosting:sites:create mf-design-patterns-account
firebase target:apply hosting account mf-design-patterns-account
firebase emulators:start --only hosting:account
firebase deploy --only hosting:account
```
