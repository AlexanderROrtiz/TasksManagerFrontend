
export interface Taskss {
  id: number;
  title: string;
  description: string;
  status: 'Pendiente' | 'En Proceso' | 'Completada';
  createdAt: Date;
  updatedAt: Date;
  assignedToUserId?: number; // Puede ser nulo
}
