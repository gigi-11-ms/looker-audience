project_name: "audience-app"

application: audience-app {
  label: "audience-app"
  url: "https://localhost:8080/bundle.js"
  # file: "bundle.js
  entitlements: {
    core_api_methods: ["me", "all_lookml_models", "lookml_model", "lookml_model_explore", "create_query", "query_for_slug", "run_query", "use_embeds", "use_form_submit"] #Add more entitlements here as you develop new functionality
    external_api_urls: ["https://makingscience.eu.looker.com/"]
    use_embeds: yes
    use_iframes: yes
  }
}
