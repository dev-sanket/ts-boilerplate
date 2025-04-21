export function bindControllerMethods<T extends object>(controller: T): T {
  const boundController = {} as T;

  Object.getOwnPropertyNames(Object.getPrototypeOf(controller)).forEach(method => {
    if (method !== 'constructor' && typeof controller[method as keyof T] === 'function') {
      boundController[method as keyof T] = (controller[method as keyof T] as Function).bind(
        controller
      );
    }
  });

  return boundController;
}
