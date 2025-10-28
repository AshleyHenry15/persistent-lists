# Persistent Task Lists
[![Netlify Status](https://api.netlify.com/api/v1/badges/2e2adfba-988a-466d-8e0a-f32973e19949/deploy-status)](https://app.netlify.com/projects/quarto-persistent-lists/deploys)

A simple Quarto extension that makes task lists persistent across page refreshes and navigation by saving checkbox states in browser local storage.

## Installation

To use this extension in a Quarto project:

```bash
quarto add AshleyHenry15/persistent-lists
```

This will install the extension under the `_extensions` directory of your project.

## Usage

Once the extension is installed, add it to your `_quarto.yml` file:

```yaml
filters:
  - persistent-lists
```

The extension will automatically work with any standard Markdown task lists in your Quarto website:

```markdown
- [ ] Unchecked task
- [x] Checked task
```

When a user checks or unchecks a task, the state will be saved in the browser's local storage. This means:

1. Task states persist when refreshing the page
2. Task states persist when navigating away and returning to the page
3. Task states are unique to each page (URL path)

## How It Works

The extension:

1. Adds JavaScript that finds all checkboxes on the page
2. Saves their checked/unchecked state to localStorage when changed
3. Loads saved states when the page is loaded
4. Organizes the data by URL path so each page has its own saved states

## Browser Compatibility

This extension works with all modern browsers that support localStorage, including:

- Chrome
- Firefox
- Safari
- Edge

## Limitations

1. Task states are specific to the browser and device
2. Private browsing modes may limit localStorage persistence
3. The extension does not synchronize states across devices

## License

MIT
