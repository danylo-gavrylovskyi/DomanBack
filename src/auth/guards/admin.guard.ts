import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

export class OnlyAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user.isAdmin) {
			throw new ForbiddenException("No admin rights");
		}

		return user.isAdmin;
	}
}
