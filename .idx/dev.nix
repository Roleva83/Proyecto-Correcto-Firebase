{ pkgs, ... }: {
  channel = "stable-24.05";
  
  packages = [
    pkgs.nodejs_20
  ];
  
  env = {};
  
  idx = {
    extensions = [];
    
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev"];
          manager = "web";
          env = {
            PORT = "9002";
          };
        };
      };
    };
    
    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
      onStart = {};
    };
  };
}
