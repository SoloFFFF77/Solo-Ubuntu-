export const SOLO_UBUNTU_SCRIPT = `#!/usr/bin/env bash
#
# Solo Ubuntu - The Ultimate Termux Desktop
# Based on proot-distro & Modded Ubuntu principles
#
set -e

# --- Colors & Aesthetics ---
RED='\\033[0;31m'
GREEN='\\033[0;32m'
BLUE='\\033[0;34m'
CYAN='\\033[0;36m'
NC='\\033[0m'

banner() {
    clear
    echo -e "\${CYAN}"
    echo " ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄     ▄▄▄▄▄▄▄    ▄▄   ▄▄ ▄▄▄▄▄▄▄ ▄▄▄   ▄▄▄ ▄▄▄   ▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄   ▄▄▄ "
    echo "█       █       █   █   █       █  █  █ █  █  ▄    █   █ █   █   █ █   █       █   █ █   █"
    echo "█  ▄▄▄▄▄█   ▄   █   █   █   ▄   █  █  █ █  █ █▄█   █   █ █   █   █▄█   █    ▄  █   █ █   █"
    echo "█ █▄▄▄▄▄█  █ █  █   █   █  █ █  █  █  █▄█  █       █   █ █   █      █  █   █▄█ █   █ █   █"
    echo "█▄▄▄▄▄  █  █▄█  █   █▄▄ █  █▄█  █  █       █  ▄   ██   █▄█   █     █   █    ▄  █   █▄█   █"
    echo " ▄▄▄▄▄█ █       █       █       █  █       █ █▄█   █       █ █     █   █   █ █ █       █"
    echo "█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█  █▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄█   █▄▄▄█▄▄▄█ █▄█▄▄▄▄▄▄▄█"
    echo -e "\${NC}"
    echo -e "\${BLUE}>> Optimized for Termux | XFCE4 | VS Code | Modded Themes\${NC}"
    echo ""
}

banner
echo -e "\${GREEN}[*] Checking dependencies...\${NC}"
pkg update -y && pkg upgrade -y
pkg install -y proot-distro git wget pulseaudio tigervnc x11-repo python3 neofetch

# --- Install Ubuntu ---
echo -e "\${GREEN}[*] Installing Ubuntu Core...\${NC}"
if proot-distro list | grep -q "ubuntu"; then
    echo "Ubuntu already installed. Resetting configuration..."
    proot-distro reset ubuntu
else
    proot-distro install ubuntu
fi

# --- Setup Internal Environment ---
echo -e "\${GREEN}[*] Configuring Ubuntu Environment...\${NC}"
# We use a heredoc to run commands INSIDE the proot environment
proot-distro login ubuntu --bind /dev/null:/proc/sys/kernel/cap_last_cap -- bash -lc "
    export DEBIAN_FRONTEND=noninteractive

    # 1. Core Update
    apt update -y && apt upgrade -y
    
    # 2. Install Desktop & Utilities
    echo 'Installing XFCE4, Browser, and Tools...'
    apt install -y xfce4 xfce4-goodies tigervnc-standalone-server \\
                   dbus-x11 x11-xserver-utils python3-pip git wget nano \\
                   firefox fonts-firacode neofetch htop

    # 3. Install Theming (Modded Ubuntu Style)
    echo 'Installing Themes (Arc & Papirus)...'
    apt install -y arc-theme papirus-icon-theme dmz-cursor-theme

    # 4. Install VS Code (Code Server)
    echo 'Installing VS Code (code-server)...'
    curl -fsSL https://code-server.dev/install.sh | sh

    # 5. Configure VNC & Startup
    mkdir -p ~/.vnc
    echo 'ubuntu' | vncpasswd -f > ~/.vnc/passwd
    chmod 600 ~/.vnc/passwd

    cat > /usr/local/bin/vnc_start <<'EOF'
#!/bin/bash
export DISPLAY=:1
export USER=root

# Cleanup
rm -rf /tmp/.X1-lock /tmp/.X11-unix/X1

# Start PulseAudio (Optional, if forwarded)
# pulseaudio --start || true

# Apply Themes on Startup (Headless setup workaround)
# We create a small autostart entry to apply themes once XFCE loads
mkdir -p ~/.config/autostart
cat > ~/.config/autostart/theme-setup.desktop <<'THEME'
[Desktop Entry]
Type=Application
Name=ThemeSetup
Exec=bash -c 'xfconf-query -c xsettings -p /Net/ThemeName -s \"Arc-Dark\"; xfconf-query -c xsettings -p /Net/IconThemeName -s \"Papirus-Dark\"'
Hidden=false
NoDisplay=true
X-GNOME-Autostart-enabled=true
THEME

# Launch VNC
vncserver :1 -geometry 1280x720 -depth 24 -xstartup /usr/bin/startxfce4
echo -e \"\\n\\033[0;32m>> VNC Started! Connect to 127.0.0.1:5901\\033[0m\"
echo -e \"\\033[0;34m>> VS Code (if run) available at http://127.0.0.1:8080\\033[0m\"
EOF
    chmod +x /usr/local/bin/vnc_start

    # 6. Fancy Terminal (Bashrc)
    cat >> ~/.bashrc <<'BASH'
export PS1='\[\033[0;32m\]┌──(\[\033[1;34m\]solo㉿ubuntu\[\033[0;32m\])-[\[\033[0;37m\]\w\[\033[0;32m\]]\n\[\033[0;32m\]└─\[\033[1;31m\]$\[\033[0m\] '
neofetch
echo -e "Run 'vnc_start' to launch desktop."
echo -e "Run 'code-server' to launch VS Code."
BASH
"

# --- Host Shortcuts ---
echo -e "\${GREEN}[*] Creating Termux shortcuts...\${NC}"
mkdir -p $HOME/bin
cat > $HOME/bin/solo-start <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
pulseaudio --start --exit-idle-time=-1 2>/dev/null || true
proot-distro login ubuntu --shared-tmp -- bash -lc "/usr/local/bin/vnc_start"
EOF
chmod +x $HOME/bin/solo-start

cat > $HOME/bin/solo-login <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
proot-distro login ubuntu --shared-tmp
EOF
chmod +x $HOME/bin/solo-login

echo -e "\${GREEN}"
echo "==============================================="
echo "   INSTALLATION COMPLETE - SOLO UBUNTU READY   "
echo "==============================================="
echo -e "\${NC}"
echo "1. Run 'solo-start' to launch the VNC Server."
echo "2. Open VNC Viewer and connect to localhost:5901 (Pass: ubuntu)."
echo "3. Run 'solo-login' to enter the terminal only."
echo ""
`;

export const MANUAL_GUIDE = `# Solo Ubuntu Manual Installation

If you prefer to install step-by-step or the automatic script fails, follow this guide.

## Prerequisites
- **Termux** (F-Droid version recommended)
- At least **4GB** free storage
- Internet connection

## 1. Setup Termux Base
Update repositories and install the container engine.
\`\`\`bash
pkg update -y && pkg upgrade -y
pkg install -y proot-distro git wget pulseaudio tigervnc x11-repo
\`\`\`

## 2. Install Ubuntu (Base)
We use \`proot-distro\` for a stable, high-performance container.
\`\`\`bash
proot-distro install ubuntu
\`\`\`

## 3. Enter the Environment
Login to the Ubuntu system.
\`\`\`bash
proot-distro login ubuntu
\`\`\`
*(You are now inside Ubuntu)*

## 4. Install Desktop & Themes (Inside Ubuntu)
Update apt and install XFCE4, Firefox, and theme assets.
\`\`\`bash
apt update -y
apt install -y xfce4 xfce4-goodies tigervnc-standalone-server dbus-x11 firefox
apt install -y arc-theme papirus-icon-theme
\`\`\`

## 5. Setup VNC Server
Create the startup script at \`/usr/local/bin/vnc_start\`:

\`\`\`bash
cat > /usr/local/bin/vnc_start <<'EOF'
#!/bin/bash
export DISPLAY=:1
# Set Arc Dark Theme
xfconf-query -c xsettings -p /Net/ThemeName -s "Arc-Dark" 2>/dev/null || true
xfconf-query -c xsettings -p /Net/IconThemeName -s "Papirus-Dark" 2>/dev/null || true

vncserver :1 -geometry 1280x720 -depth 24 -xstartup /usr/bin/startxfce4
EOF
chmod +x /usr/local/bin/vnc_start
\`\`\`

Set the default password to 'ubuntu':
\`\`\`bash
mkdir -p ~/.vnc
echo 'ubuntu' | vncpasswd -f > ~/.vnc/passwd
chmod 600 ~/.vnc/passwd
\`\`\`

## 6. Launching
Inside Ubuntu, run:
\`\`\`bash
/usr/local/bin/vnc_start
\`\`\`
Connect via VNC Viewer to \`127.0.0.1:5901\`.
`;
