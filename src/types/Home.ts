export interface Device {
  id: string;
  name: string;
  type: 'door' | 'fridge';
  status: string;
  activeTime: string;
  battery: number;
  isOpen?: boolean;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'device' | 'warning' | 'info';
}
