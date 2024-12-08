project_name: "audience-app"

application: audience-app {
  label: "audience-app"
  url: "https://localhost:8080/bundle.js"
  # file: "bundle.js
  entitlements: {
    core_api_methods: ["me", "all_lookml_model", "lookml_model", "lookml_model_explore", "create_query"] #Add more entitlements here as you develop new functionality
  }
}
