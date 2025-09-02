---
layout: ./[post].astro
title: 'New System'
author: 'Aoi'
pubDate: 2025-09-02
slug: new-system
description: 'Description of the post'
image: 
    url: '../../src/assets/images/sample01.jpg'
    alt: 'Sample image for testing'
tags: ["test2", "test3"]
---
## Overview

### Goals

Debian 13 (Trixie) with
- Grub-Btrfs for restoring snapshots from the Grub menu
- Timeshift
- ZRAM instead of a physical Swap partition
- Flatpak versions of commonly used applications
- KVM/QEMU virutual machine with VirtIO and shared folders for Windows

### Target machine:

- Lenovo ThinkPad T480
- Intel Core i5-8350U
- 16GB RAM
- 1TB SSD
- Intel UHD 620 Graphics

## Installation

### Preparation

It's probably best to have an Ethernet connection during installation, Debian can be quite annoying when it comes to setting up wifi

Since Debian 13 (Trixie) is not officially released yet (it will be in 2 weeks, we will use the Debian 12 (Bookworm) netinstaller for now, and upgrade to Trixie later once we have finished the installation

Use Ventoy to boot the installation ISO

### Installation (before partitioning)

Some of the configurations (region, locale etc.) are tailored to my personal needs. Feel free to change these to your own preferences.

Choose **Advanced options ...** and then **Expert install**

Choose language: default will be **English**

Choose region: other -> **Europe -> Germany**.

Choose locale: **en_GB.UTF-8**. Additional locales: **de_DE.UTF-8**

Choose keyboard: **German**

Detect and mount installation media: just wait for the process to finish and press Continue

Load installer components from installation media: I installed extra packages for disk partition (fdisk, parted) and rescue tool

Detect network hardware and Configure the network: since we are using Ethernet for the installtion, choose **enp0s31f6** for the primary network interface, and hit auto-configure network.

Choose hostname: here it will be **t480**

Domain name: skip

Set up users and passwords: do **NOT** allow root to log in, instead a user account will be created with sudo privileges

Configure the clock: Set the clock using NTP (Network Time Protocol). Hit continue to use the default NTP server. Default time zone for Germany is **Europe/Berlin**

### Partitioning

#### Detect disks and Partition disks:

Choose **Manual** option

Select the main SSD of the system, here it is **/dev/nvme0n1**

Create a new empty partition table on this device with partition table type **gpt**

Select the free space (here 1.0 TB) and click **Create a new partition**

Create a partition for boot with **500M**, Location **Beginning**, Use as **EFI System Partition (ESP)**

Create a partition for the **rest of the free space**, Use as **btrfs journaling file system**

Finish partitioning and write changes to disk

Select **No** when asked to return to the partitioning menu, we are using ZRAM instead of a physical Swap storage

Write the changes to disks

**DO NOT CLICK "Install the base system"!** We need to configure Btrfs and Timeshift first. For that, we go to the BusyBox with the keybind **Alt + F2**

#### BusyBox:

List all drives currently available
```
~ # df -h
[Drive name] ... [Mounted on]
/dev/sda2 ... /cdrom
/dev/nvme0n1p2 ... /target
/dev/nvme0n1p1 ... /target/boot/efi
```

Unmount the ESP and Btrfs partition we created earlier
```
~ # umount /target/boot/efi
~ # umount /target
~ # ls
```

Mount the Btrfs partition to /mnt
```
~ # mount /dev/nvme0n1p2 /mnt
~ cd /mnt
/mnt # ls
@rootfs
/mnt # mv @rootfs/ @
```

Create the first subvolume `@home`. After that, we can check whether it has existed in `/mnt`
```
/mnt # btrfs su cr @home
Create subvolume './@home'
/mnt # ls
@ @home
```

Create the rest of the necessary subvolumes: `@root`, `@log`, `@tmp`, `@opt`
```
/mnt # btrfs su cr @root
/mnt # btrfs su cr @log
/mnt # btrfs su cr @tmp
/mnt # btrfs su cr @opt
```

Now we will mount the `/target` to `/dev/nvme0n1p2`, which should be the larger partition of our NVMe drive, the smaller one is for the ESP
```
/mnt # mount -o noatime,compress=zstd,subvol=@ /dev/nvme0n1p2 /target
```

We will now create the rest of the directories for the previously created subvolumes and mount them to appropritate locations in `/target`
```
/mnt # mkdir -p /target/boot/efi
/mnt # mkdir -p /target/home
/mnt # mkdir -p /target/root
/mnt # mkdir -p /target/var/log
/mnt # mkdir -p /target/tmp
/mnt # mkdir -p /target/opt

/mnt # mount -o noatime,compress=zstd,subvol=@home /dev/nvme0n1p2 /target/home
/mnt # mount -o noatime,compress=zstd,subvol=@root /dev/nvme0n1p2 /target/root
/mnt # mount -o noatime,compress=zstd,subvol=@log /dev/nvme0n1p2 /target/var/log
/mnt # mount -o noatime,compress=zstd,subvol=@tmp /dev/nvme0n1p2 /target/tmp
/mnt # mount -o noatime,compress=zstd,subvol=@opt /dev/nvme0n1p2 /target/opt
```

After this, we mount the ESP to the smaller partition `/dev/nvme0n1p1` on our drive:
```
/mnt # mount /dev/nvme0n1p1 /target/boot/efi
```

We now have to edit the fstab to configure volumes for Grub-Btrfs:
```
/mnt # nano /target/etc/fstab
```

This is what we will see in the text editor Nano:
```
# <file system> <mount point> <type> <options> <dump> <pass>
# / was on /dev/nvme0n1p2 during installtion
UUID=53238c4e-9c27-4947-9f43-1602308dca10 / btrfs noatime,compress=zstd,subvol=@ 0 0
```

Use Ctrl+K to cut the `UUID=...` line and Ctrl+U to paste it out 6 times. Note that the UUID will be different for your drive. Change the partitions and volumes according to those we have created earlier. The fstab after modification should look like this:
```
UUID=53238c4e-9c27-4947-9f43-1602308dca10 / btrfs noatime,compress=zstd,subvol=@ 0 0
UUID=53238c4e-9c27-4947-9f43-1602308dca10 /home btrfs noatime,compress=zstd,subvol=@home 0 0
UUID=53238c4e-9c27-4947-9f43-1602308dca10 /root btrfs noatime,compress=zstd,subvol=@root 0 0
UUID=53238c4e-9c27-4947-9f43-1602308dca10 /var/log btrfs noatime,compress=zstd,subvol=@log 0 0
UUID=53238c4e-9c27-4947-9f43-1602308dca10 /tmp btrfs noatime,compress=zstd,subvol=@tmp 0 0
UUID=53238c4e-9c27-4947-9f43-1602308dca10 /opt btrfs noatime,compress=zstd,subvol=@opt 0 0
```

Enter Ctrl+O, Enter and Ctrl+X to save the changes. We can now exit Busybox with **Alt + F1**

### Installation (after partitioning)

We have now finished partitioning our drive for Grub-Btrfs. The installation can be continued as normal. Again, some configurations made here are tailored to my own needs, change these if you need to.

Install the base system

Choose kernel to install: **linux-image-amd64**

Drivers to include in the initrd: **Generic**

Configure the package manager:

Use a network mirror
- Protocol for file downloads: **http**
- Debian archive mirror country: **Germany**
- Debian archive mirror: **deb.debian.org**
- Skip the HTTP proxy information
- Use non-free firmware and non-free software
- Do **NOT** enable source repositories in APT
- Enable backported software just in case

Select and install software:
- Updates management on this system: **No automatic updates**. This means that updates are to be installed manually using the package manager
- Tasksel: For now I will leave **KDE Plasma**

Install the GRUB Bootloader:
- Force GRUB installation to the EFI removable media path? **No**
- Update NVRAM variables to automatically boot into Debian? **Yes**
- Run os-prober automatically to detect and boot other OSes? **No**

Finish the installation:
- Is the system clock set to UTC? **Yes**
- Continue to reboot and unplug the USB installer