module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {},
  // globals: {
  //   "window": true, "global": true
  // }
  // globals: [
  //   "window", "global", "TARGET", "CONFIG", "VERSION", "DEBUG"
  // ]
  globals: {
    "window": true, 
    "global": true, 
    "TARGET": true, 
    "CONFIG": true, 
    "VERSION": true, 
    "DEBUG": true
  }
}
