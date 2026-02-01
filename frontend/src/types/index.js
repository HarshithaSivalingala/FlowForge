// Type definitions for the application
// Used as JSDoc comments for better IDE support

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} type
 */

/**
 * @typedef {Object} Process
 * @property {number} id
 * @property {string} name
 * @property {number} sequence
 */

/**
 * @typedef {Object} Machine
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} MachineAssignment
 * @property {number} machineId
 * @property {string} machineName
 * @property {number} quantity
 */

/**
 * @typedef {'Locked' | 'Ready' | 'Assigned' | 'Completed'} ProcessStatus
 */

/**
 * @typedef {Object} ProcessAssignment
 * @property {number} processId
 * @property {string} processName
 * @property {number} availableQuantity
 * @property {number} completedQuantity
 * @property {ProcessStatus} status
 * @property {MachineAssignment[]} assignments
 */

/**
 * @typedef {'Pending' | 'In Progress' | 'Completed'} WorkOrderStatus
 */

/**
 * @typedef {Object} WorkOrder
 * @property {number} id
 * @property {string} customerName
 * @property {string} productType
 * @property {number} productId
 * @property {number} quantity
 * @property {WorkOrderStatus} status
 * @property {string} createdDate
 * @property {string} [dueDate]
 * @property {ProcessAssignment[]} processAssignments
 */

export {};
