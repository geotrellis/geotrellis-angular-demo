# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.8"

VAGRANTFILE_API_VERSION = "2"

if !ENV["NODE_ENV"].nil? && ENV["NODE_ENV"].downcase == "test"
  VAGRANT_NETWORK_OPTIONS = { auto_correct: true }
else
  VAGRANT_NETWORK_OPTIONS = { auto_correct: false }
end

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.synced_folder "~/.aws", "/home/vagrant/.aws"

  # Wire up package caching:
  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :machine
  end

  config.vm.provider :virtualbox do |vb|
    vb.memory = 2048
    vb.cpus = 2
  end

  config.vm.network :forwarded_port, guest: 7357, host: 7357, auto_correct: true

  config.vm.network :forwarded_port, {
                      guest: 9090, host: 9090, auto_correct: true
                    }.merge(VAGRANT_NETWORK_OPTIONS)

  config.vm.network :forwarded_port, {
                      guest: 7358, host: 7358, auto_correct: true
                    }.merge(VAGRANT_NETWORK_OPTIONS)

  # Change working directory to /vagrant upon session start.
  config.vm.provision "shell", inline: <<SCRIPT
    if ! grep -q "cd /vagrant" "/home/vagrant/.bashrc"; then
        echo "cd /vagrant" >> "/home/vagrant/.bashrc"
    fi
SCRIPT

  config.vm.provision "ansible" do |ansible|
      ansible.playbook = "deployment/ansible/geotrellis-demo.yml"
      ansible.galaxy_role_file = "deployment/ansible/roles.yml"
  end
end
