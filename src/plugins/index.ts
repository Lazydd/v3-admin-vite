import type { App } from "vue"
import { installDragDirective } from "./drag"
import { installPermissionDirective } from "./permission-directive"
import { installSvgIcon } from "./svg-icon"

export function installPlugins(app: App) {
  installPermissionDirective(app)
  installDragDirective(app)
  installSvgIcon(app)
}
