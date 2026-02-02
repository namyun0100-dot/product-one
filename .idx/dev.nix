{ pkgs, ... }:
{
  packages = [
    pkgs.nodejs
    pkgs.python3
  ];

  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "python" "-m" "http.server" "$PORT" "--bind" "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
