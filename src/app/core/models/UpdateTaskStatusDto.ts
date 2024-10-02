export interface UpdateTaskStatusDto {
  status: string;      // Nuevo estado de la tarea, por ejemplo: "Completo", "En Progreso", etc.
  remarks?: string;    // Comentarios opcionales sobre el cambio de estado
}
