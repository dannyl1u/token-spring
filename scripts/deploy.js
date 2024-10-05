async function main() {
    // Get the contract to deploy
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);
  
    const Token = await ethers.getContractFactory("MyToken");
    
    // Deploy the contract with an initial supply (e.g., 1000 tokens)
    const token = await Token.deploy(1000);
  
    console.log("Token deployed to:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  