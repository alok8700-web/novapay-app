data "aws_eks_cluster" "novapay" {
  name = var.cluster_name
}

data "aws_eks_cluster_auth" "novapay" {
  name = var.cluster_name
}

data "aws_vpc" "novapay" {
  id = data.aws_eks_cluster.novapay.vpc_config[0].vpc_id
}
