export function Dijkstra(graph) {
  const visited = new Array(graph.length).fill(false);
  const path = [];
  const queue = [0];

  while (queue.length > 0) {
    const node = queue.shift();
    visited[node] = true;
    path.push(node);

    let index = 0;
    let dist = Infinity;
    for (let i = 0; i < graph[node].length; i++) {
      if (visited[i] || i === node) {
        continue;
      }
      if (dist > graph[node][i]) {
        dist = graph[node][i];
        index = i;
      }
    }

    if (index !== 0 && dist !== Infinity) {
      queue.push(index);
    }
  }
  return path;
}
