# Bit Frontend
Our project is built on [create-react-app][1] and utilizes functional components with the help of [React Hooks][2] to handle the "lifecycle" of each component. We use [Redux][3] to handle our complex state management and [styled-components][4] for styling our components. All our designs are prototyped in our [Figma][5]

# Guidelines for Creating Components
// overview

## General Process
1. Visually, all components are first prototyped on Figma. [Here's the link][5]
2. Then we implement it in our project, on the particular view it should appear on. If it's a new view, you can create a page for it, linking it through the `App` component and use that area as your workspace. 

## Styling
In order to create responsive styling in our application, we use `ems` and `percents` for everything from container sizes to fonts instead of `px`. We created global media queries that vary font-sizes so that by using `ems`, every device will have a similar user experience. This doesn't extend to mobile devices, however, but right now our focus is desktop and tablet users.

## Structure

**Imports**: should be at the top of the file

**styled-components**: declarations should come next, generally placed in the order that they are used.

**Components**:
- all styled-components declarations should be outside the component, before the component's declaration.
- all props for the component should be destructured inline in the component parameters. This is to create a visible interface for each components.
- In the body of the component, variables should generally come, then Hooks, then functions, and then the rendering `return`.
- If the component is `connect`ed to the Redux store, the `mapStateToProps` and mapDispatchToProps` functions should come next.
- If there are multiple components in a file, then the above points, including styled-components will still apply, so that each component will have its own section in the file.

# Helpful Notes
Try to reuse components as much as possible. The shared components folder is under `src/components/shared/`. The `low` folder indicates that the component a very low-level, meaning it can be reused without much discretion. The `high` folder indicates that a component is a lot more specific, but still reusable, and tends to combine many `low` components. The `containers` folder indicates that the component is used as a wrapper or container for many other components.

# Work in Progress
Documentation is a work in progress right now and much more will be created so that new contributors will have a more streamlined process in contributing to our project.


[1]: https://reactjs.org/docs/create-a-new-react-app.html
[2]: https://reactjs.org/docs/hooks-intro.html
[3]: https://redux.js.org/
[4]: https://styled-components.com/
[5]: https://www.figma.com/file/pyXHrfSlr2xx3xunNXjcpx/New-UI
