# NovaPay Terraform IaC

This Terraform layer manages the **platform resources around the existing NovaPay EKS cluster**.

The EKS cluster was originally created outside Terraform, so this first version intentionally uses Terraform **data sources** to discover the existing cluster and VPC instead of creating a second VPC/EKS cluster.

## What this teaches

- Terraform providers
- Input variables
- Data sources
- Kubernetes provider authentication from EKS
- Creating Kubernetes namespaces with Terraform
- Helm provider configuration for future platform components
- Safe separation between existing infrastructure and Terraform-managed resources

## Current infrastructure discovered from the environment

- EKS cluster: `novapay-eks`
- AWS region: `us-east-1`
- Kubernetes version: `1.33`
- Existing VPC: `vpc-07426b49d12469e09`
- Existing node group: `novapay-ng`
- Existing storage class: `gp2`

## Files

```text
terraform/
├── README.md
├── versions.tf
├── variables.tf
├── data.tf
├── providers.tf
├── namespaces.tf
└── terraform.tfvars.example
```

## Important safety rule

Do **not** add a VPC or EKS resource to this configuration yet. Doing so would describe a new cluster rather than adopting the existing `novapay-eks` cluster.

The current configuration is intentionally read-only with respect to AWS infrastructure and only creates the Kubernetes namespaces listed in `namespaces.tf`.

## Run

```bash
cd terraform

terraform init
terraform fmt -check
terraform validate
terraform plan
```

Apply only after reviewing the plan:

```bash
terraform apply
```

## Next stage

Once this foundation is understood, the project can be extended to manage:

1. SonarQube namespace and Helm release
2. Nexus namespace and Helm release
3. Persistent volume configuration
4. Ingress resources
5. Monitoring resources
6. IAM/IRSA or EKS Pod Identity where required

Keep secrets out of Terraform source files and commit history. Use AWS Secrets Manager, SSM Parameter Store, Kubernetes Secrets, or another secret-management solution instead.
