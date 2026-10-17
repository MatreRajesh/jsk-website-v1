import {
  Server, Network, Camera, HardDrive, Fingerprint, Monitor,
  Cable, Shield, Cpu, TestTube, Wrench, Users,
  MapPin, ClipboardCheck, Layers, Gauge, Handshake, Search,
} from 'lucide-react';

// Photos: Unsplash (free licence), stored locally in /public/images.

export const featuredServices = [
  {
    id: '01',
    title: 'Network Infrastructure',
    description: 'LAN installation, cable termination, routers, switches, Wi-Fi configuration, and full connectivity testing.',
    tags: ['LAN', 'Wi-Fi', 'Switches', 'Routers'],
    icon: Network,
    image: '/images/svc-network.webp',
  },
  {
    id: '02',
    title: 'CCTV & Surveillance',
    description: 'IP camera installation, NVR/DVR setup, remote access configuration and system-level testing.',
    tags: ['IP Cameras', 'NVR', 'Remote Access'],
    icon: Camera,
    image: '/images/svc-cctv.webp',
  },
  {
    id: '03',
    title: 'Server & Rack Systems',
    description: 'Server installation, rack assembly, PDU mounting, cable management and labeling for data rooms.',
    tags: ['Racks', 'Servers', 'PDU'],
    icon: HardDrive,
    image: '/images/svc-server.webp',
  },
  {
    id: '04',
    title: 'Structured Cabling',
    description: 'Wire routing, patch panels, LAN termination, labeling and continuity testing for clean infrastructure.',
    tags: ['Cat6/6A', 'Patch Panels', 'Testing'],
    icon: Cable,
    image: '/images/svc-cabling.webp',
  },
  {
    id: '05',
    title: 'POS Systems',
    description: 'POS hardware installation, connectivity, configuration support, testing and troubleshooting.',
    tags: ['Terminals', 'Printers', 'Scanners'],
    icon: Monitor,
    image: '/images/svc-pos.webp',
  },
  {
    id: '06',
    title: 'Testing & Commissioning',
    description: 'System verification, fault diagnosis, commissioning support and structured handover.',
    tags: ['Diagnostics', 'Commissioning', 'Handover'],
    icon: TestTube,
    image: '/images/svc-testing.webp',
  },
];

export const moreServices = [
  { title: 'IT Infrastructure', description: 'Hardware, devices and workstation installation and maintenance.', icon: Server },
  { title: 'Biometric & Access', description: 'Biometric and access-control field devices.', icon: Fingerprint },
  { title: 'Safety & Field Devices', description: 'MCP, hooters and site safety device installation and testing.', icon: Shield },
  { title: 'I/O Termination', description: 'Field wiring, I/O termination and connectivity verification.', icon: Cpu },
  { title: 'Maintenance & Support', description: 'On-site diagnosis, preventive maintenance and troubleshooting.', icon: Wrench },
  { title: 'Site Technical Support', description: 'On-site technical manpower for projects and installations.', icon: Users },
];

export const capabilities = [
  { id: 'network', title: 'Network', items: ['LAN', 'Ethernet', 'Routers', 'Switches', 'Wi-Fi', 'Connectivity Testing'] },
  { id: 'security', title: 'Security', items: ['CCTV', 'IP Cameras', 'NVR / DVR', 'Biometric Systems', 'Access Devices'] },
  { id: 'infra', title: 'IT Infrastructure', items: ['Servers', 'Racks', 'PDU', 'Hardware', 'Cable Management', 'Equipment Installation'] },
  { id: 'field', title: 'Field Systems', items: ['I/O Termination', 'MCP', 'Hooters', 'Field Devices', 'Site Testing'] },
  { id: 'support', title: 'Support', items: ['Troubleshooting', 'Maintenance', 'Commissioning', 'Handover', 'Technical Support'] },
];

export const industries = [
  { name: 'Corporate Offices', systems: ['LAN', 'Wi-Fi', 'Server', 'Access'], image: '/images/ind-corporate.webp' },
  { name: 'Retail', systems: ['Network', 'CCTV', 'POS', 'Wi-Fi'], image: '/images/ind-retail.webp' },
  { name: 'Hospitality', systems: ['Wi-Fi', 'CCTV', 'Network', 'POS'], image: '/images/ind-hospitality.webp' },
  { name: 'Warehouses', systems: ['Network', 'CCTV', 'Wi-Fi', 'Access'], image: '/images/ind-warehouse.webp' },
  { name: 'Industrial & Logistics', systems: ['Field Devices', 'Safety', 'I/O', 'Network'], image: '/images/ind-industrial.webp' },
  { name: 'Commercial Buildings', systems: ['Cabling', 'Server Rooms', 'CCTV'], image: '/images/ind-commercial.webp' },
  { name: 'Education', systems: ['Campus Wi-Fi', 'Network', 'CCTV'], image: '/images/ind-education.webp' },
  { name: 'Healthcare', systems: ['Secure LAN', 'CCTV', 'Access Control'], image: '/images/ind-healthcare.webp' },
];

export const processSteps = [
  { step: '01', title: 'Understand the Requirement', description: 'We discuss your technical needs and project scope.', icon: Search },
  { step: '02', title: 'Site Assessment', description: 'Our team evaluates the site conditions and existing infrastructure.', icon: MapPin },
  { step: '03', title: 'Plan the Installation', description: 'We design the implementation strategy and resource plan.', icon: Layers },
  { step: '04', title: 'Install & Configure', description: 'Our technicians execute the installation and configuration.', icon: Wrench },
  { step: '05', title: 'Test & Troubleshoot', description: 'Every system is tested and issues are resolved on-site.', icon: Gauge },
  { step: '06', title: 'Commission & Handover', description: 'Final commissioning and complete system handover.', icon: Handshake },
];

export const whyJskCards = [
  { title: 'On-Site Expertise', description: 'Practical field experience across IT infrastructure and technical systems.', icon: MapPin },
  { title: 'End-to-End Execution', description: 'From installation and termination to testing, troubleshooting, and commissioning.', icon: Layers },
  { title: 'Multi-System Capability', description: 'Networking, CCTV, servers, POS, biometric systems, safety devices, and field infrastructure.', icon: Network },
  { title: 'Testing-Focused Approach', description: 'Systems are tested and verified before final handover.', icon: ClipboardCheck },
  { title: 'Problem Solving', description: 'Diagnosis of hardware, connectivity, wiring, and system-level issues.', icon: Search },
  { title: 'Project Support', description: 'Reliable support through installation, testing, maintenance, and commissioning.', icon: Handshake },
];

export const projects = [
  {
    category: 'Network Infrastructure',
    title: 'Corporate HQ Network Deployment',
    description: 'Structured cabling, switch installation and Wi-Fi deployment for a multi-floor corporate office, with full connectivity testing and handover.',
    scope: ['Cat6A Cabling', 'Core Switches', 'Access Points', 'Certification Testing'],
    image: '/images/prj-network.webp',
  },
  {
    category: 'CCTV & Surveillance',
    title: 'Logistics Yard Security',
    description: 'IP camera network covering perimeter and interior zones, integrated with existing NVR systems and configured for remote access.',
    scope: ['IP Cameras', 'NVR Configuration', 'Fiber Uplinks', 'Commissioning'],
    image: '/images/prj-cctv.webp',
  },
  {
    category: 'Server & Rack Systems',
    title: 'Data Room Rack Build',
    description: 'Assembly, mounting and cable management for multiple server racks, including PDU installation, labeling and power testing.',
    scope: ['Rack Assembly', 'Cable Management', 'PDU Install', 'Labeling'],
    image: '/images/prj-server.webp',
  },
];

export const serviceOptions = [
  'Network Infrastructure', 'CCTV & Security', 'Server & Rack Setup', 'Wi-Fi Solutions',
  'POS Systems', 'Biometric & Access', 'Structured Cabling', 'Safety Devices (MCP/Hooters)',
  'I/O Termination', 'Maintenance & Support', 'Site Commissioning', 'Other / Not Sure',
];
