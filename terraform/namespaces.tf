resource "kubernetes_namespace_v1" "platform" {
  for_each = var.platform_namespaces

  metadata {
    name = each.value

    labels = {
      "app.kubernetes.io/managed-by" = "terraform"
      "project"                     = "novapay"
    }
  }
}
