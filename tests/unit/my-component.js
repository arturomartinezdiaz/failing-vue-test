/* istanbul ignore file */
import MyComponent from '@/my-component';

describe('MyComponent', () =>
{
    const { name = '' } = MyComponent;
    it('Name is "my-component"', () => expect(name).toBe('my-component'));
});
