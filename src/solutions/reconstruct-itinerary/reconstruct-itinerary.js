class Solution {
  solve(tickets) {
    const graph = {};
    // Remove inefficient ticket sorting
    for (const [source, destination] of tickets) {
      if (!graph[source]) {
        graph[source] = [];
      }
      graph[source].push(destination);
    }

    // Sort destinations for each source (FIX #2)
    for (const source in graph) {
      graph[source].sort();
    }

    function dfs(source, graph, usedTickets) {
      // Base case: if we've used all tickets
      if (usedTickets === tickets.length) {
        return [source]; // Start building result from end
      }

      if (!graph[source] || graph[source].length === 0) {
        return null;
      }
      const dests = graph[source];
      for (let i = 0; i < dests.length; i++) {
        // Make a deep copy of the graph before trying each path

        const result = dfs(
          dests[i],
          { ...graph, [source]: [...dests.slice(0, i), ...dests.slice(i + 1)] },
          usedTickets + 1
        );
        if (result) {
          return [source, ...result]; // Build path on successful return
        }
      }

      return null;
    }

    return dfs('JFK', graph, 0);
  }
  solveAlternative(tickets) {
    tickets.sort(([source1, destination1], [source2, destination2]) => {
      if (source1 === source2) {
        return -destination1.localeCompare(destination2);
      }
      return -source1.localeCompare(source2);
    });
    let graph = {};
    for (const [source, destination] of tickets) {
      if (!graph[source]) {
        graph[source] = [];
      }
      graph[source].push(destination);
    }
    let path = [];
    function dfs(source, path) {
      let destinations = graph[source];
      while (destinations && destinations.length !== 0) {
        const destination = destinations.pop();
        path = dfs(destination, path);
      }
      path.push(source);
      return path;
    }
    dfs('JFK', path);
    return path.reverse();
  }
  solveWithStack(tickets) {
    tickets.sort(([source1, destination1], [source2, destination2]) => {
      if (source1 === source2) {
        return -destination1.localeCompare(destination2);
      }
      return -source1.localeCompare(source2);
    });
    let graph = {};
    for (const [source, destination] of tickets) {
      if (!graph[source]) {
        graph[source] = [];
      }
      graph[source].push(destination);
    }
    let path = [];
    let stack = ['JFK'];
    while (stack.length > 0) {
      let curr = stack[stack.length - 1];
      let destinations = graph[curr];
      if (destinations && destinations.length > 0) {
        stack.push(destinations.pop());
      } else {
        path.push(stack.pop());
      }
    }
    return path.reverse();
  }
}

module.exports = Solution;
