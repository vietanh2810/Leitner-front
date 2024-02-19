import { mount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue';

describe('MyComponent', () => {
  it('emits "quizz-clicked" event when the QUIZZ button is clicked', async () => {
    const wrapper = mount(MyComponent);
    
    // Trouver le bouton "QUIZZ" dans le composant et déclencher un clic
    await wrapper.find('button[aria-label="QUIZZ"]').trigger('click');
    
    // Vérifier que l'événement "quizz-clicked" a été émis
    expect(wrapper.emitted('quizz-clicked')).toBeTruthy();
  });

  it('emits "card-clicked" event when the CARD button is clicked', async () => {
    const wrapper = mount(MyComponent);
    
    // Trouver le bouton "CARD" dans le composant et déclencher un clic
    await wrapper.find('button[aria-label="CARD"]').trigger('click');
    
    // Vérifier que l'événement "card-clicked" a été émis
    expect(wrapper.emitted('card-clicked')).toBeTruthy();
  });
});
