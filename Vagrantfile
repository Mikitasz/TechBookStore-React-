Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/bionic64" # Choose a suitable base box
    config.vm.network "forwarded_port", guest: 3306, host: 3307
    config.vm.network "forwarded_port", guest: 80, host: 8080
    config.vm.network "forwarded_port", guest: 8000, host: 8081
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "1024" # Adjust memory as needed
      vb.cpus = 2 # Adjust CPU cores as needed
    end
  
    config.vm.provision "shell", inline: <<-SHELL
      # Update and install necessary packages
      apt-get update
      apt-get install -y python3 python3-pip mysql-server
    
      mysql -u root -e "CREATE DATABASE mydb;"
      mysql -u root -e "CREATE USER 'django'@'%' IDENTIFIED BY 'django';"
      mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO django@'%'  IDENTIFIED BY 'django';"
      mysql -u root -e "FLUSH PRIVILEGES;"
      sudo service mysql restart
    SHELL
  end
  
