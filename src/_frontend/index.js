const search_result = {
  data() {
    return {
      title: 'test',
      sentence: 'bruh',
      sim: 100,
    };
  },
};

const table = {
  data() {
    return {
      tab: 'test message',
    };
  },
};

Vue.createApp(search_result).mount('.search-result');
Vue.createApp(table).mount('.table');
