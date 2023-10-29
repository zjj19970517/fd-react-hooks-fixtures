import { BEM, createBEM } from './bem'
import { COMPONENT_CLASS_PREFIX } from '../constants/component-global'

export type CreateNamespaceReturn = [BEM, string]

export function createNamespace(
  name: string,
  prefix?: string
): CreateNamespaceReturn {
  name = `${prefix || COMPONENT_CLASS_PREFIX}-${name}`
  return [createBEM(name), name]
}
