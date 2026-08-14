variable "aws_region" {
  description = "AWS region containing the existing NovaPay EKS cluster."
  type        = string
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "Existing EKS cluster name."
  type        = string
  default     = "novapay-eks"
}

variable "platform_namespaces" {
  description = "Namespaces that Terraform should create for platform tooling."
  type        = set(string)
  default = [
    "sonarqube",
    "nexus"
  ]
}
